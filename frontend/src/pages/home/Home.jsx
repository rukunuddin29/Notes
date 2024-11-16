import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard'; // Confirm this path is correct
import AddEditNotes from './AddEditNotes';
import { MdAdd } from 'react-icons/md';
import Modal from 'react-modal';

// Ensure you set the root app element for accessibility with React Modal
Modal.setAppElement('#root');

function Home() {
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });

    return (
        <>
            <Navbar />

            <div className="container mx-auto mt-4">
                <div className="grid grid-cols-3 gap-4 mt-8">
                    <NoteCard
                        title="Meeting on 7th April"
                        date="3rd April 2024"
                        content="Meeting on 7th AprilMeeting on 7th AprilMeeting on 7th AprilMeeting on 7th AprilMeeting on 7th April"
                        tags="#meeting"
                        isPinned={true}
                        onEdit={() => console.log("Edit Note")}
                        onDelete={() => console.log("Delete Note")}
                        onPinNote={() => console.log("Pin Note")}
                    />
                </div>
            </div>

            {/* Add Note Button */}
            <button 
                className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-400 fixed right-10 bottom-10"
                onClick={() => setOpenAddEditModal({ isShown: true, type: 'add', data: null })}
            >
                <MdAdd className="text-[32px] text-white" />
            </button>

            {/* Modal for Adding/Editing Notes */}
            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => setOpenAddEditModal({ ...openAddEditModal, isShown: false })}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    },
                }}
                contentLabel="Add/Edit Note Modal"
                className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
            >
                <AddEditNotes
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.data}
                    onClose={() => setOpenAddEditModal({ isShown: false, type: 'add', data: null })}
                />
            </Modal>
        </>
    );
}

export default Home;
