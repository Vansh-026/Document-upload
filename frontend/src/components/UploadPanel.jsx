import React, { useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import './UploadPanel.css';

const UploadPanel = () => {
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [year, setYear] = useState('2025');
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('Notes');   // ✅ New state for title
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 🔹 All Branches
  const branches = [
    "CSE",
    "IT",
    "ECE",
    "EEE",
    "ME",
    "Civil",
    "Chemical",
    "Biotech",
    "AIML",
    "Data Science",
    "Other"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('branch', branch);
    formData.append('semester', semester);
    formData.append('year', year);
    formData.append('title', title);     // ✅ Added title
    formData.append('subject', subject);
    formData.append('file', file);

    try {
      await axios.post('/api/upload', formData);
      setMessage('✅ Upload successful!');
      setBranch('');
      setSemester('');
      setYear('2025');
      setTitle('Notes');
      setSubject('');
      setFile(null);
    } catch (err) {
      setMessage('❌ Upload failed.');
    }
    setLoading(false);
  };

  if (loading) return <Loader />;

  return (
    <div className="upload-panel">
      <h2>Upload Document</h2>
      <form onSubmit={handleSubmit}>
        {/* 🔹 Branch Dropdown */}
        <select value={branch} onChange={(e) => setBranch(e.target.value)} required>
          <option value="">Select Branch</option>
          {branches.map(b => <option key={b} value={b}>{b}</option>)}
        </select>

        {/* 🔹 Semester Dropdown */}
        <select value={semester} onChange={(e) => setSemester(e.target.value)} required>
          <option value="">Select Semester</option>
          {[...Array(8)].map((_, i) => (
            <option key={i+1} value={i+1}>{i+1}</option>
          ))}
        </select>

        {/* 🔹 Year Input */}
        <input
          type="number"
          placeholder="Enter Year (e.g., 2025)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />

        {/* 🔹 Subject Input */}
        <input
          type="text"
          placeholder="Subject (e.g., Mathematics)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        {/* 🔹 Title Input */}
        <input
          type="text"
          placeholder="Title (e.g. Notes)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* 🔹 File Input */}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadPanel;
