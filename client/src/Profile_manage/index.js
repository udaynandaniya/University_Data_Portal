import { useEffect, useState } from 'react';
import ProfileDetails from './ProfileDetails';
import EditProfile from './EditProfile';
import { useProfile } from '../../context/ProfileContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProfileManager = ({ role, enrollment }) => {
  const { profile, setProfile, tempProfile, setTempProfile } = useProfile();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    axios.get(`/api/profile/${role}/${enrollment}`)
      .then(res => {
        setProfile(res.data);
        setTempProfile(res.data);
      })
      .catch(err => {
        toast.error("Failed to load profile");
        console.error(err);
      });
  }, []);

  const handleUpdate = (updatedData) => {
    const isSame = JSON.stringify(updatedData) === JSON.stringify(profile);
    setTempProfile(updatedData);

    if (isSame) {
      axios.put(`/api/profile/${role}/${enrollment}`, updatedData)
        .then(() => {
          setProfile(updatedData);
          toast.success("Profile updated in DB");
        })
        .catch(err => {
          toast.error("DB Update failed");
        });
    } else {
      toast("Changes saved temporarily");
    }

    setEditing(false);
  };

  return editing
    ? <EditProfile profile={tempProfile} onSave={handleUpdate} />
    : <ProfileDetails profile={tempProfile} onEdit={() => setEditing(true)} />;
};

export default ProfileManager;
