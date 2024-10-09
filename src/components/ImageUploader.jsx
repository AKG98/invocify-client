import { useEffect, useRef, useState } from 'react';
import { Modal, Slider, Button, Progress, message } from 'antd';
import AvatarEditor from 'react-avatar-editor';
import avatar from '../assets/images/imageUp.png';
import app from '../firebase';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, updateUser } from '../features/Slices/userSlice';

export default function ImageUploader({imageName,defImage}) {
  const user  = useSelector(state => state.user.user);
  const fileName = user?._id;
  const [imageurl, setImageUrl] = useState(null);
  const [image, setImage] = useState(null);
  const [editor, setEditor] = useState(null);
  const [scale, setScale] = useState(1);
  const [visible, setVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);  // Upload progress
  const [progressVisible, setProgressVisible] = useState(false);  // Progress modal visibility
  const fileInputRef = useRef(null);
  const storage = getStorage(app);
  const dispatch = useDispatch();

  const handleSelectFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setVisible(true); // Open modal for cropping
    };
    reader.readAsDataURL(file);
  };

  const handleScaleChange = (value) => {
    setScale(value);
  };

  const handleSave = () => {
    if (editor) {
      const canvasScaled = editor.getImageScaledToCanvas().toDataURL();
      setImage(canvasScaled);
      setVisible(false); // Close cropping modal
      uploadImageToFirebase(canvasScaled); // Upload the cropped image
    }
  };

  const uploadImageToFirebase = async (imageData) => {
    setUploading(true);
    setProgressVisible(true);  // Show progress modal

    try {
      const storageRef = ref(storage, `${fileName}/${imageName}.png`);
      
      // Convert the base64 data URL to a blob
      const blob = await (await fetch(imageData)).blob();
      
      // Upload the blob using Resumable Upload to track progress
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progressPercent.toFixed(2));  // Update progress state
        },
        (error) => {
          console.error('Upload error:');
          message.error('Error uploading image.');
          setProgressVisible(false);  // Hide progress modal if error occurs
        },
        async () => {
          // Handle successful upload
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setImageUrl(downloadURL);

          setProgressVisible(false);  // Hide progress modal when done
          setUploading(false);  // Reset uploading state
        }
      );
    } catch (error) {
      console.error('Error uploading image:');
      setUploading(false);
    }
  };

  // function to upload image url to mongodb
  const uploadImageUrl = async (url) => {

    try {
        const id = user._id;
        const userData = { ...user, [imageName]: url };
        dispatch(updateUser({ id, userData })).then((response) => {
            if(response){
                dispatch(hideLoading());
              message.success("Image uploaded successfully");
            }
            else{
              message.error("Something went wrong, Try again ");
            }
        }
        );
    } catch (error) {
      return error.response.data;
    }
  }

  useEffect(() => {
    if(defImage === null){
      return ;
    }
    setImage(defImage);
  }, [defImage]);

  useEffect(() => {
    if(imageurl){
      uploadImageUrl(imageurl);
    }
  }, [imageurl]);

  return (
    <div>
      <div className='w-[150px] h-[150px] overflow-hidden border rounded-xl flex items-center justify-center'>
        <img
          src={defImage || avatar}
          alt=""
          className='w-full h-full object-cover border cursor-pointer'
          onClick={handleSelectFile}
        />
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>

      {/* Modal for cropping */}
      <Modal
        maskClosable={false}
        open={visible}
        title="Edit Image"
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="back" onClick={() => setVisible(false)}>Cancel</Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleSave}
            disabled={uploading}
          >
            {uploading ? 'Saving...' : 'Save'}
          </Button>,
        ]}
      >
        {image && (
          <>
            {/* Center-align the editor */}
            <div className='flex justify-center items-center mt-5'>
              <AvatarEditor
                ref={(ref) => setEditor(ref)}
                image={image}
                width={200}
                height={200}
                border={50}
                scale={scale}
              />
            </div>
            <div className="mt-4">
              <label>Zoom:</label>
              <Slider
                min={1}
                max={3}
                step={0.1}
                value={scale}
                onChange={handleScaleChange}
              />
            </div>
          </>
        )}
      </Modal>

      {/* Progress Modal */}
      <Modal
        open={progressVisible}
        title="Uploading Image"
        footer={null}
        closable={false}
      >
        <div className="text-center">
          <Progress type="circle" percent={Math.round(progress)} />
          {progress === 100 && <p>Upload Successful!</p>}
        </div>
      </Modal>
    </div>
  );
}
