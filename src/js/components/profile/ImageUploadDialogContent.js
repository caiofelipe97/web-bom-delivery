import { DialogContent, CardMedia,Card, Typography, CardContent, Button } from '@material-ui/core';
import React, { PureComponent } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { withStyles} from '@material-ui/core/styles';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const styles = theme => ({
    contentDiv:{
        display:'flex',
        alignItems: 'center'
    },
    imgOriginal:{
        maxWidth: 500, 
        maxHeight: 500, 
        minHeight: 100, 
        minWidth: 100,
        margin: theme.spacing(1)
    },
    imgCropped:{
        margin: theme.spacing(1),
        width: 100,
        height: 100

    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e3e3e3'
      },
      details: {
        display: 'flex'
      },
      content: {
        flex: '1 0 auto'
      },
      cancelButton:{
        marginLeft: 10,
        backgroundColor: "#F24405",
        color: "#FFFFFF"
      },
      buttons:{
        width: '100%',
        display: 'flex',
        marginTop: 10,
        justifyContent:'flex-end'
      },
      inputDiv:{
        margin: theme.spacing(1)
      }
 })
class ImageUploadDialogContent extends PureComponent {

  state = {
    src: null,
    crop: {
      aspect: 1 / 1,
      unit: '%',
        width: 50,
        height: 50,
        x: 25,
        y: 25
    },
  };


  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }

  render() {
    const { crop, croppedImageUrl, src } = this.state;
    const { classes, handleImgUpload, handleImgDialogClose } = this.props;
    return (
        <DialogContent>
        <div className={classes.inputDiv}>
          <input  type="file" accept="image/*" onChange={this.onSelectFile} />
        </div>
        <div className={classes.contentDiv}>

        {src && (
            <Card className={classes.root} variant="outlined">
      <div className={classes.details}>
        <CardContent className={classes.content}>
        <Typography component="h5" variant="h5">
            Imagem escolhida
          </Typography>
        </CardContent>
      </div>
      <CardMedia
      >
<ReactCrop
        className={classes.imgOriginal}
          minHeight={100}
          minWidth={100}
            src={src}
            crop={crop}
            ruleOfThirds
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />     
           </CardMedia>
    </Card>
      
        )}
    {src && (<KeyboardArrowRightIcon color="primary" fontSize="large"/>) }
    {croppedImageUrl && (
    <div>
    <Card className={classes.root} variant="outlined">
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            Logo
          </Typography>
        </CardContent>
      </div>
      <CardMedia
      >
      <img alt="crop" className={classes.imgCropped} src={croppedImageUrl}/>
      </CardMedia>
    </Card>
    <div className={classes.buttons}>
        <Button onClick={()=>handleImgUpload(croppedImageUrl)}variant="contained"  color="secondary" type="submit">Salvar</Button>
        <Button onClick={handleImgDialogClose} className={classes.cancelButton} variant="contained" >cancelar</Button>
    </div>
    </div>
    
    
        )}
       
</div>

</DialogContent>    );
  }
}

export default withStyles(styles)(ImageUploadDialogContent);