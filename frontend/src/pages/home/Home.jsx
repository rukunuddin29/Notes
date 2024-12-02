import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard'; // Confirm path
import AddEditNotes from './AddEditNotes';
import { MdAdd } from 'react-icons/md';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance'; // Confirm path
import moment from 'moment'; // Import moment.js

// Set root app element for accessibility
Modal.setAppElement('#root');

function Home() {
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: 'add',
        data: null,
    });
    const [userInfo, setUserInfo] = useState(null);
    const [allNotes, setAllNotes] = useState([]);
    const navigate = useNavigate();

    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get('/get-user');
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                navigate('/login');
            }
        }
    };

    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get('/get-all-notes');
            if (response.data && response.data.notes) {
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            console.error('An unexpected error occurred. Please try again.');
        }
    };

    useEffect(() => {
        getAllNotes();
        getUserInfo();
    }, []);

    return (
        <>
            <Navbar userInfo={userInfo} />

            <div className="container mx-auto mt-4">
                <div className="grid grid-cols-3 gap-4 mt-8">
                    {allNotes.map((item, index) => (
                        <NoteCard
                            key={item._id}
                            title={item.title}
                            date={moment(item.createdOn).format('DD MMM YYYY')}
                            content={item.content}
                            tags={item.tags}
                            isPinned={item.isPinned}
                            onEdit={() => {}}
                            onDelete={() => {}}
                            onPinNote={() => {}}
                        />
                    ))}
                </div>
            </div>

            <button
                className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-400 fixed right-10 bottom-10"
                onClick={() => setOpenAddEditModal({ isShown: true, type: 'add', data: null })}
            >
                <MdAdd className="text-[32px] text-white" />
            </button>

            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => setOpenAddEditModal({ ...openAddEditModal, isShown: false })}
                style={{
                    overlay: { backgroundColor: 'rgba(0, 0, 0, 0.2)' },
                    content: { width: '40%', maxHeight: '75%', margin: 'auto', padding: '20px', borderRadius: '10px' },
                }}
                contentLabel="Add/Edit Note Modal"
            >
                <AddEditNotes
                    getAllNotes={getAllNotes}
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.data}
                    onClose={() => setOpenAddEditModal({ isShown: false, type: 'add', data: null })}
                />
            </Modal>
        </>
    );
}

export default Home;
