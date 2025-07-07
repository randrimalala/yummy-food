// src/components/ContactForm.jsx
import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    // 👉 Tu peux ici envoyer les données à ton backend avec fetch() ou axios
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center text-sm">
      <p className="text-lg text-blue-600 font-medium pb-2">Contact Us</p>
      <h1 className="text-4xl font-semibold text-slate-700 pb-4">Get in touch with us</h1>
      <p className="text-sm text-gray-500 text-center pb-10">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />
        Lorem Ipsum has been the industry's standard dummy text.
      </p>

      <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
        <div className="w-full">
          <label className="text-black/70" htmlFor="name">Your Name</label>
          <input
            className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300"
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <label className="text-black/70" htmlFor="email">Your Email</label>
          <input
            className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300"
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-6 w-[350px] md:w-[700px]">
        <label className="text-black/70" htmlFor="message">Message</label>
        <textarea
          className="w-full mt-2 p-2 h-40 border border-gray-500/30 rounded resize-none outline-none focus:border-indigo-300"
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="mt-5 bg-indigo-600 text-white h-12 w-56 px-4 rounded active:scale-95 transition"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
