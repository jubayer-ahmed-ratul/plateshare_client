import React, { useState, useContext } from 'react';
import { AuthContext } from '../../components/context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { Edit3, Save, X, User, Mail, Camera } from 'lucide-react';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    photoURL: user?.photoURL || '',
    email: user?.email || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      await updateProfile(user, {
        displayName: formData.displayName,
        photoURL: formData.photoURL
      });
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      displayName: user?.displayName || '',
      photoURL: user?.photoURL || '',
      email: user?.email || ''
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please log in to view your profile
          </h2>
          <button 
            onClick={() => window.location.href = '/login'}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
            >
              <Edit3 size={16} />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
              >
                <Save size={16} />
                <span>{loading ? 'Saving...' : 'Save'}</span>
              </button>
              <button
                onClick={handleCancel}
                disabled={loading}
                className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
              >
                <X size={16} />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="relative inline-block mb-6">
              <img
                src={formData.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.displayName || formData.email)}&background=0c4428&color=ffffff&size=128`}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-green-200"
              />
              {isEditing && (
                <div className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full">
                  <Camera size={16} />
                </div>
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {formData.displayName || 'User'}
            </h2>
            <p className="text-gray-600 mb-4">{formData.email}</p>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Account Status</h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                ✓ Verified Account
              </span>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h3>
            
            <div className="space-y-6">
              {/* Display Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User size={16} className="inline mr-2" />
                  Display Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your display name"
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                    {formData.displayName || 'Not set'}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  Email Address
                </label>
                <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-500">
                  {formData.email}
                  <span className="text-xs ml-2">(Cannot be changed)</span>
                </div>
              </div>

              {/* Photo URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Camera size={16} className="inline mr-2" />
                  Profile Photo URL
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    name="photoURL"
                    value={formData.photoURL}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter photo URL"
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                    {formData.photoURL || 'Using default avatar'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Created
                </label>
                <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                  {user.metadata?.creationTime ? 
                    new Date(user.metadata.creationTime).toLocaleDateString() : 
                    'Unknown'
                  }
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Sign In
                </label>
                <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                  {user.metadata?.lastSignInTime ? 
                    new Date(user.metadata.lastSignInTime).toLocaleDateString() : 
                    'Unknown'
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;