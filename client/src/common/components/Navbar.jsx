import { GiCloudUpload, GiJumpingDog, GiPauseButton, GiPlayButton } from 'react-icons/gi';
import axios from 'axios';

export default function Navbar() {

    const uploadFiles = async (e) => {
        const files = e.target.files;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }
        try {
            const response = await axios.post('http://localhost:3001/torrents/upload', formData);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div className="bg-slate-50 text-slate-800 drop-shadow p-5 flex items-center justify-between">
        <a href="/" className="text-2xl flex items-center">DogT<GiJumpingDog className='-ml-1' />rrent</a>
        <ul className="list-none flex items-center text-lg gap-4 text-slate-600">
            <li className='hover:cursor-pointer hover:text-slate-800'>
                <label htmlFor="uploadFileInput" className='hover:cursor-pointer hover:text-slate-800'><GiCloudUpload /></label>
                <input type="file" id='uploadFileInput' onChange={uploadFiles} multiple={true} hidden />
            </li>
            <li className='hover:cursor-pointer hover:text-slate-800'>
                <GiPauseButton />
            </li>
            <li className='hover:cursor-pointer hover:text-slate-800'>
                <GiPlayButton />
            </li>
        </ul>
    </div>
  )
}
