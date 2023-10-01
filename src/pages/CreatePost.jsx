import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setgeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImg = async () => {
    const { prompt } = form;
    if (prompt) {
      try {
        setgeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: prompt }),
        });
        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        console.log(err);
        alert(err);
      } finally {
        setgeneratingImg(false);
      }
    } else {
      alert('please enter the prompt');
    }
  };

  const renderCreateForm = () => {
    return (
      <form
        className='mt-16 max-w-3xl'
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col gap-5'>
          <FormField
            labelName='Your Name'
            type='text'
            name='name'
            placeholder='Alson A'
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName='Prompt'
            type='text'
            name='prompt'
            placeholder='A plush toy robot sitting against a yellow wall'
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          {renderImages()}
          {renderGenerateButton()}
          {renderCommunityText()}
        </div>
      </form>
    );
  };

  const renderCreateText = () => {
    return (
      <div>
        <h1 className='font-extrabold text-[#222238] text-3xl'>Create</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
          Create imaginative and visually stunning images through DALL-E AI and
          share with the community
        </p>
      </div>
    );
  };

  const renderImages = () => {
    return (
      <div className='relative bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 w-64 h-64 p-3 flex justify-center items-center'>
        {form.photo ? (
          <img
            src={form.photo}
            alt={form.prompt}
            className='w-full h-full object-contain'
          />
        ) : (
          <img
            src={preview}
            alt='preview'
            className='w-9/12 h-9/12 object-contain opacity-40'
          />
        )}
        {generatingImg && isGeneratingImage()}
      </div>
    );
  };

  const renderGenerateButton = () => {
    return (
      <div className='mt-5 flex gap-5'>
        <button
          type='button'
          onClick={generateImg}
          className='text-white rounded-md text-sm px-5 font-medium bg-green-700 w-full sm:w-auto py-2.5 text-center'
        >
          {generatingImg ? 'Generating...' : 'Generate'}
        </button>
      </div>
    );
  };

  const renderCommunityText = () => {
    return (
      <div className='mt-10'>
        <p className='mt-2 text-[#666e75] text-[14px]'>
          Once you have created a image you want you can share it with others in
          the community
        </p>
        <button
          type='submit'
          className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
        >
          {loading ? 'Sharing...' : 'Share with the community'}
        </button>
      </div>
    );
  };

  const isGeneratingImage = () => {
    return (
      <div className='absolute inset-0 z-0 flex justify-center items-center rounded-lg bg-[rgba(0,0,0,0.5)]'>
        <Loader />
      </div>
    );
  };

  return (
    <section className='w-max-7xl mx-auto'>
      {renderCreateText()}
      {renderCreateForm()}
    </section>
  );
};

export default CreatePost;
