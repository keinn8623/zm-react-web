import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/home/Home';
import About from '@/pages/about/About';
import StuManage from '@/pages/stuManage/StuManage';
import TeacherManage from '@/pages/teacherManage/TeacherManage';
import GenerateText from '@/pages/generateTest/GenerateText';
import ScoreRecord from '@/pages/scoreRecord/ScoreRecord';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/stuManage',
    element: <StuManage />,
  },
  {
    path: '/teacherManage',
    element: <TeacherManage />,
  },
  {
    path: '/generateText',
    element: <GenerateText />,
  },
  {
    path: '/scoreRecord',
    element: <ScoreRecord />,
  },

]);

export default router;