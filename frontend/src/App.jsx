// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import Navbar from './components/layout/Navbar';
// import Footer from './components/layout/Footer';
// import HomePage from './pages/HomePage';
// import ProjectsPage from './pages/ProjectsPage';
// import ProjectDetailPage from './pages/ProjectDetailPage';
// import MerkuriyAppPage from './pages/MerkuriyAppPage';
// import LeadModal from './components/common/LeadModal';
// import Toast from './components/common/Toast';

// // Component to scroll to top automatically when route changes
// function ScrollToTop() {
//   const { pathname } = useLocation();
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);
//   return null;
// }

// export default function App() {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [defaultProjectType, setDefaultProjectType] = useState('');
//   const [toastMessage, setToastMessage] = useState('');
//   const [toastType, setToastType] = useState('success');

//   const openLeadModal = (projectType = '') => {
//     setDefaultProjectType(projectType);
//     setModalOpen(true);
//   };

//   const closeLeadModal = () => {
//     setModalOpen(false);
//   };

//   const showToast = (message, type = 'success') => {
//     setToastMessage(message);
//     setToastType(type);
//   };

//   return (
//     <Router>
//       <ScrollToTop />
//       <div className="flex flex-col min-h-screen bg-brand-surface dark:bg-brand-dark text-slate-800 dark:text-slate-100 transition-colors">
//         {/* Global Navigation Header */}
//         <Navbar onOpenLeadModal={openLeadModal} />

//         {/* Dynamic Page Views */}
//         <main className="flex-1">
//           <Routes>
//             <Route
//               path="/"
//               element={<HomePage onOpenLeadModal={openLeadModal} showToast={showToast} />}
//             />
//             <Route
//               path="/projects"
//               element={<ProjectsPage onOpenLeadModal={openLeadModal} showToast={showToast} />}
//             />
//             <Route
//               path="/projects/:id"
//               element={<ProjectDetailPage showToast={showToast} />}
//             />
//             <Route
//               path="/merkuriy-app"
//               element={<MerkuriyAppPage showToast={showToast} />}
//             />
//             {/* Fallback route */}
//             <Route
//               path="*"
//               element={<HomePage onOpenLeadModal={openLeadModal} showToast={showToast} />}
//             />
//           </Routes>
//         </main>

//         {/* Global Footer */}
//         <Footer />

//         {/* Lead Consultation Modal */}
//         <LeadModal
//           isOpen={modalOpen}
//           onClose={closeLeadModal}
//           onSuccess={(msg) => showToast(msg, 'success')}
//           defaultProjectType={defaultProjectType}
//         />

//         {/* Floating Toast Notification */}
//         <Toast
//           message={toastMessage}
//           type={toastType}
//           onClose={() => setToastMessage('')}
//         />
//       </div>
//     </Router>
//   );
// }


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import MerkuriyAppPage from './pages/MerkuriyAppPage';
import LeadModal from './components/common/LeadModal';
import Toast from './components/common/Toast';

// Sahifa o'zgarganda ekranni tepaga qaytaruvchi yordamchi komponent
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultProjectType, setDefaultProjectType] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  // Backenddan umumiy kontakt ma'lumotlarini saqlash uchun state
  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get('/api/contact/');
        setContactData(response.data);
      } catch (error) {
        console.error("Aloqa ma'lumotlarini yuklashda xatolik:", error);
      }
    };

    fetchContact();
  }, []);

  const openLeadModal = (projectType = '') => {
    setDefaultProjectType(projectType);
    setModalOpen(true);
  };

  const closeLeadModal = () => {
    setModalOpen(false);
  };

  const showToast = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-brand-surface dark:bg-brand-dark text-slate-800 dark:text-slate-100 transition-colors">
        
        {/* Navbar: backenddan kelgan telefon va nomni ishlatadi */}
        <Navbar onOpenLeadModal={openLeadModal} contact={contactData} />

        {/* Dynamic Page Views */}
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={<HomePage onOpenLeadModal={openLeadModal} showToast={showToast} />}
            />
            <Route
              path="/projects"
              element={<ProjectsPage onOpenLeadModal={openLeadModal} showToast={showToast} />}
            />
            <Route
              path="/projects/:id"
              element={<ProjectDetailPage showToast={showToast} />}
            />
            <Route
              path="/merkuriy-app"
              element={<MerkuriyAppPage showToast={showToast} />}
            />
            <Route
              path="*"
              element={<HomePage onOpenLeadModal={openLeadModal} showToast={showToast} />}
            />
          </Routes>
        </main>

        {/* Footer: barcha aloqa va tarmoq ma'lumotlarini to'liq chiqaradi */}
        <Footer contact={contactData} />

        {/* Lead Consultation Modal */}
        <LeadModal
          isOpen={modalOpen}
          onClose={closeLeadModal}
          onSuccess={(msg) => showToast(msg, 'success')}
          defaultProjectType={defaultProjectType}
        />

        {/* Floating Toast Notification */}
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage('')}
        />
      </div>
    </Router>
  );
}