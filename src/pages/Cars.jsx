import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import {Air, Doors, GearBox, Next, Passager, Star} from '../assets/images/Icons'

function Cars() {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/cars")
      .then((res) => res.json())
      .then((data) => setCars(data));
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      id: Math.floor(Math.random() * 10),
      name: e.target.name.value,
      rating: e.target.rating.value,
      reviews: e.target.reviews.value,
      passegers: e.target.passegers.value,
      gearbox: e.target.gearbox.value,
      condition: e.target.condition.value,
      doors: e.target.doors.value,
      price: e.target.price.value,
      ImgUrl: selectedImage, 
    };

    fetch("http://localhost:3000/cars", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      e.target.reset();
      setTimeout(() => {
        location.pathname = '/';
      }, 300);
    });
  }

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='w-[1120px] h-[693px] '>
      <div className='mx-auto w-[130px]'><Button title="Add Cars" extraStyle="!bg-[#1572D31A] !text-[#1572D3] !w-[130px] p-3" onClick={toggleModal} /></div>
      <h1 className='mt-[24px] font-semibold text-[38px] text-[#333333] text-center'>Most popular cars rental deals</h1>
      <ul className='mt-[64px] w-full h-[445px] flex justify-center space-x-[32px]'>
      
      {cars.slice(0, 4).map((item, index) => (
          <li key={index} className='w-[256px] h-[445px] shadow rounded-lg px-[23px]'>
          <div className="p-2">
          <img src={item.ImgUrl} className='mx-auto mt-[36px] w-[200px] h-[91px]' alt="img" />
            <h2 className='uppercase mt-[28px] font-semibold text-[16px]'>{item.name}</h2>
            <div className='flex items-center space-x-[6px] mt-[12px] text-[14px]'><Star/><p className='font-semibold'>{item.rating}</p><p className='text-[#959595]'>({item.reviews} reviews)</p></div>
            <div className='w-[208px] flex gap-[41px] mt-[16px]'>
              <div className='flex space-x-[4px] items-center text-[13px] text-[#959595]'><Passager/><div>{item.passegers} Passegers</div></div>
              <div className='flex space-x-[4px] items-center text-[13px] text-[#959595]'><GearBox/><div>{item.gearbox}</div></div>
            </div>
            <div className='w-[208px] flex justify-between mt-[10px] pb-[24px] border-b-[1px] border-slate-400'>
              <div className='flex space-x-[4px] items-center text-[13px] text-[#959595]'><Air/><div>Condition / {item.condition}</div></div>
              <div className='flex space-x-[4px] items-center text-[13px] text-[#959595]'><Doors/><div>{item.doors} Doors</div></div>
            </div>
            <div className='w-[208px] flex justify-between mt-[20px]'>
                <p className='text-[#595959] text-[15px] font-semibold'>Price</p>
                <div><span className='font-semibold'>${item.price}</span><span className='text-[#959595]'> / day</span></div>
            </div>
            <button className={'!w-[208px] bg-[#1572D3] flex justify-center items-center gap-[8px] text-white py-[10px] mt-[20px] rounded-lg'}>Rent Now <Next/></button>
          </div>
      </li>
        ))}
      </ul>
      </div>
      

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="flex flex-col w-[700px] space-y-[10px]">
              <input
                type="text"
                name="name"
                className="w-full border-[1px] border-slate-400  p-2 outline-none rounded-lg"
                required
                placeholder="Car Name"
              />
              <input
                type="text"
                name="rating"
                className="w-full border-[1px] border-slate-400 p-2 outline-none rounded-lg"
                required
                placeholder="Car Rating"
              />
              <input
                type="number"
                className="w-full border-[1px] border-slate-400 p-2 outline-none rounded-lg"
                required
                name="reviews"
                placeholder="Reviews"
              />
              <input
                type="number"
                className="w-full border-[1px] border-slate-400 p-2 outline-none rounded-lg"
                required
                name="passegers"
                placeholder="Passegers"
                max={10}
              />
              <select
                required
                name="gearbox"
                className="w-full border-[1px] border-slate-400 p-2 outline-none rounded-lg text-slate-600"
              >
                <option value="" disabled selected>GearBox</option>
                <option>Auto</option>
                <option>Mexanic</option>
              </select>
              <select
                required
                name="condition"
                className="w-full border-[1px] border-slate-400 p-2 outline-none rounded-lg text-slate-600"
              >
                <option value="" disabled selected>Air Conditioning</option>
                <option>Yes</option>
                <option>No</option>
              </select>
              <input
                type="number"
                className="w-full border-[1px] border-slate-400 p-2 outline-none rounded-lg"
                name="doors"
                required
                placeholder="Doors"
                max={4}
              />
              <input
                type="number"
                className="w-full border-[1px] border-slate-400 p-2 outline-none rounded-lg"
                name="price"
                required
                placeholder="Price"
                max={5000}
              />

              <label className="flex flex-col items-center justify-center p-4 border-[1px] border-slate-400 rounded-lg cursor-pointer">
                <input
                  type="file"
                  name="ImgUrl"
                  className="hidden"
                  onChange={handleImageChange}
                />
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-[300px] h-[100px] object-contain"
                  />
                ) : (
                  'Import Img'
                )}
              </label>

              <Button title="Add" extraStyle="mx-auto bg-sky-600" type="submit" />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cars;
