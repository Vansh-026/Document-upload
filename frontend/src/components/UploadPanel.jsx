import React, { useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import './UploadPanel.css';

const UploadPanel = () => {
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [year, setYear] = useState('2025');
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('Notes');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 🔹 All Branches
  const branches = [
    "CSE", "IT", "ECE", "EEE", "ME", "Civil", 
    "Chemical", "Biotech", "AIML", "Data Science", "Other"
  ];

  // ✅ Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("⚠️ Please select a file to upload.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('branch', branch);
    formData.append('semester', semester);
    formData.append('year', year);
    formData.append('title', title);
    formData.append('subject', subject);
    formData.append('file', file);

    try {
      await axios.post('https://document-upload-a9fg.onrender.com/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('✅ Document uploaded successfully!');
      // Reset form
      setBranch('');
      setSemester('');
      setYear('2025');
      setTitle('Notes');
      setSubject('');
      setFile(null);
    } catch (err) {
      setMessage('❌ Upload failed. Please try again.');
    }
    setLoading(false);
  };

  if (loading) return <Loader />;

  return (
    <section className="upload-panel" aria-labelledby="upload-heading">
      <h2 id="upload-heading">📂 Upload Document</h2>
      <p className="upload-subtitle">Easily upload notes, assignments, or study material.</p>

      <form onSubmit={handleSubmit} className="upload-form">
        {/* Branch Dropdown */}
        <label htmlFor="branch">Select Branch</label>
        <select 
          id="branch"
          value={branch} 
          onChange={(e) => setBranch(e.target.value)} 
          required
        >
          <option value="">-- Select Branch --</option>
          {branches.map(b => <option key={b} value={b}>{b}</option>)}
        </select>

        {/* Semester Dropdown */}
        <label htmlFor="semester">Select Semester</label>
        <select 
          id="semester"
          value={semester} 
          onChange={(e) => setSemester(e.target.value)} 
          required
        >
          <option value="">-- Select Semester --</option>
          {[...Array(8)].map((_, i) => (
            <option key={i+1} value={i+1}>{`Semester ${i+1}`}</option>
          ))}
        </select>

        {/* Year Input */}
        <label htmlFor="year">Academic Year</label>
        <input
          id="year"
          type="number"
          min="2000"
          max="2100"
          placeholder="Enter Year (e.g., 2025)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />

        {/* Subject Input */}
        <label htmlFor="subject">Subject</label>
        <input
          id="subject"
          type="text"
          placeholder="Subject (e.g., Mathematics)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        {/* Title Input */}
        <label htmlFor="title">Document Title</label>
        <input
          id="title"
          type="text"
          placeholder="Title (e.g., Notes, Assignment, Lab File)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* File Input */}
        <label htmlFor="file">Choose File</label>
        <input
          id="file"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.png"
          required
        />

        <button type="submit" className="upload-btn">🚀 Upload</button>
      </form>

      {message && <p className={`upload-message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</p>}
    </section>
  );
};

export default UploadPanel;
