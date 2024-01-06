 
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { addHomeSliderUrl } from '@/src/Utils/Urls/HomeSliderUrl';
import useProducts from '@/src/Hooks/useProducts';

const HomeSlider = () => {
	const { handleSubmit, register } = useForm();
	const {categoryData} = useProducts()
	const [loading, setLoading] = useState(false);
	const [desktopImageFile, setDesktopImageFile] = useState(null);
	const [mobileImageFile, setMobileImageFile] = useState(null);
	const [desktopImagePreview, setDesktopImagePreview] = useState(null);
	const [mobileImagePreview, setMobileImagePreview] = useState(null);
	const [desktopUploadProgress, setDesktopUploadProgress] = useState(0);
	const [mobileUploadProgress, setMobileUploadProgress] = useState(0);

	const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
	const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
	const cloud_api = process.env.NEXT_PUBLIC_CLOUDINARY_API;
	const cloud_folder = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_FOLDER;

	const handleFileChange = (e, setImageFile, setImagePreview) => {
		const file = e.target.files[0];
		if (file) {
			setImageFile(file);
			const previewUrl = URL.createObjectURL(file);
			setImagePreview(previewUrl);
		}
	};

	const uploadImageToCloudinary = async (file, setProgress) => {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('public_id', `${cloud_folder}/Slider/${file.name}`);
		formData.append('upload_preset', upload_preset);

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open('POST', cloud_api, true);

			xhr.upload.onprogress = (event) => {
				if (event.lengthComputable) {
					const progress = Math.round((event.loaded / event.total) * 100);
					setProgress(progress);
				}
			};

			xhr.onload = () => {
				if (xhr.status === 200) {
					const response = JSON.parse(xhr.responseText);
					resolve(response.secure_url);
				} else {
					reject('Upload failed');
				}
			};

			xhr.onerror = () => reject('Error during upload');
			xhr.send(formData);
		});
	};

	const onSubmit = async (dataValue) => {
		try {
			setLoading(true);
			const desktopImageUrl = await uploadImageToCloudinary(desktopImageFile, setDesktopUploadProgress);
			const mobileImageUrl = await uploadImageToCloudinary(mobileImageFile, setMobileUploadProgress);

			const res = await fetch(addHomeSliderUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					category: dataValue?.category,
					mobileImage: mobileImageUrl,
					desktopImage: desktopImageUrl
				})
			});
			const dataRes = await res.json();

			if (dataRes.success) {
				Swal.fire({
					position: 'center',
					timerProgressBar: true,
					title: 'Successfully Photo Gallery Added!',
					iconColor: '#ED1C24',
					toast: true,
					icon: 'success',
					showClass: {
						popup: 'animate__animated animate__fadeInRight'
					},
					hideClass: {
						popup: 'animate__animated animate__fadeOutRight'
					},
					showConfirmButton: false,
					timer: 3500
				});
				setDesktopImageFile(null);
				setMobileImageFile(null);
				setDesktopImagePreview(null);
				setMobileImagePreview(null);
				setDesktopUploadProgress(0);
				setMobileUploadProgress(0);
				setLoading(false);

			} else {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong!'
				});
			}
		} catch (error) {
			console.error('Error: ', error);
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Failed to upload image!'
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className='flex flex-col gap-6'>
			{/* Desktop Image Upload Section */}
			<div>
				<div className="w-full h-full my-4">
					<div className="rounded-lg shadow-xl bg-gray-50">
						<div className="p-4">
							<label className="inline-block mb-2 text-gray-500">Upload Slider Image For Desktop</label>
							<div className="flex items-center justify-center w-full">
								<label className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
									<div className="flex flex-col items-center justify-center pt-7">
										<input
											type="file"
											className="px-4 pb-4"
											name="image"
											accept="image/*"
											onChange={(e) => handleFileChange(e, setDesktopImageFile, setDesktopImagePreview)}
										/>
									</div>
								</label>
							</div>
						</div>
					</div>
				</div>
				{desktopImagePreview && (
					<img src={desktopImagePreview} alt="Desktop Preview" className="w-[60%] h-[10rem] object-cover" />
				)}
				{desktopUploadProgress > 0 && (
					<LinearProgress variant="determinate" value={desktopUploadProgress} />
				)}
			</div>

			{/* Mobile Image Upload Section */}
			<div>
				<div className="w-full h-full my-4">
					<div className="rounded-lg shadow-xl bg-gray-50">
						<div className="p-4">
							<label className="inline-block mb-2 text-gray-500">Upload Slider Image For Mobile</label>
							<div className="flex items-center justify-center w-full">
								<label className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
									<div className="flex flex-col items-center justify-center pt-7">
										<input
											type="file"
											className="px-4 pb-4"
											name="image"
											accept="image/*"
											onChange={(e) => handleFileChange(e, setMobileImageFile, setMobileImagePreview)}
										/>
									</div>
								</label>
							</div>
						</div>
					</div>
				</div>
				{mobileImagePreview && (
					<img src={mobileImagePreview} alt="Mobile Preview" className="w-[20rem] h-[20rem] object-cover" />
				)}
				{mobileUploadProgress > 0 && (
					<LinearProgress variant="determinate" value={mobileUploadProgress} />
				)}
			</div>

			<div>
				<div>
					<select className="border-2 p-2 border-gray-300 rounded-md  w-full"
						{...register("category")}	
					>
						<option className='my-2'>Select Category</option>
						{categoryData && categoryData?.map((category) => (
                            <option key={category?._id} value={category?.name}>{category?.name}</option>
                        ))}
					</select>
				</div>
			</div>

			<div className="py-6">
				<Button
					variant="contained"
					className="common-btn "
					endIcon={<SendIcon />}
					onClick={handleSubmit(onSubmit)}
				>
					{
						loading ? 'Uploading...' : 'Submit'
					}
				</Button>
			</div>
		</section>
	);
};

export default HomeSlider;
