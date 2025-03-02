import React, { useEffect, useState } from 'react'
import Navbar from '../../components/input/Navbar'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import TravelStoryCard from '../../components/Cards/TravelStoryCard';
import { MdAdd } from 'react-icons/md';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import AddEditTravelStory from './AddEditTravelStory ';

const Home = () => {
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState(null)
  const [allStories, setAllStories] = useState([]);
  
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  // Get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      console.log("User Info Response:", response);
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // get all travel stories
  const getAllTravelStories = async () => {
    try {
      const response = await axiosInstance.get("/get-all-stories");
      console.log("API Response:", response.data); // Log the response
      if (response.data && response.data.stories) {
        setAllStories(response.data.stories);
        console.log("Stories fetched:", response.data.stories); // Log the stories
      }
    } catch (error) {
      console.log("An unexpected error occurred. please try again");
    }
  };
  
  
  //handle edit story click
  const handleEdit = (data) => {}

  //handle travel story click
  const handleViewStory = (data) => {}

  //handle update is favourite 
  const updateIsFavourite = async (storyData) => {
    const storyId = storyData._id;
  
    try {
      const response = await axiosInstance.put(
        "/update-is-favourite/" + storyId,
        {
          isFavourite: !storyData.isFavourite,
        }
      );
  
      if (response.data && response.data.story) {
        toast.success("Story updated success")
        getAllTravelStories();
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again", error);
    }
  };
  

  useEffect(() => {
    getAllTravelStories();
    getUserInfo();
  }, []);

  return (
    <>
        <Navbar userInfo={userInfo} />
        <div className='container mx-auto py-10'>
  <div className='flex justify-center'>
    <div className='flex flex-wrap justify-center gap-4'>
      {allStories.length > 0 ? (
        allStories.map((item) => (
          <TravelStoryCard 
            key={item._id} 
            imgUrl={item.imgUrl}
            title={item.title}
            story={item.story}
            date={item.visitedDate}
            visitedLocation={item.visitedLocation}
            isFavourite={item.isFavourite}
            onEdit={() => handleEdit(item)}
            onClick={() => handleViewStory(item)}
            onFavouriteClick={() => updateIsFavourite(item)}
          />
        ))
        
      ) : (
        <p>No stories available.</p>
      )}
    </div>
  </div>
</div>


        {/* add edit travel story */}
        <Modal
         isOpen={openAddEditModal.isShown}
          onRequestClose={() => {}}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.2)",
              zIndex: 999,
            },
          }}
          appElement={document.getElementById("root")}
          className="model-box"
          >

            <AddEditTravelStory 
            type={openAddEditModal.type}
            storyInfo={openAddEditModal.data}
            onClose={() => {
              setOpenAddEditModal({isShown: false, type: "add", data: null});
            }}
            getAllTravelStories={getAllTravelStories}
            />
        </Modal>



        <button
          className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-400 fixed right-10 bottom-10"
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type: "add", data: null });
          }}
        >
          <MdAdd className="text-[32px] text-white" />
        </button>


        <ToastContainer />
    </>
  );
};

export default Home;