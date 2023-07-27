import { useState } from 'react';
import './App.css';
import { NavBar } from './components/NavBar';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';

export function App() {
	return (
		<div className="
			min-h-screen w-full
			flex justify-between items-center flex-col gap-4
		">
			<NavBar/>

			{/* <div className='rounded-md border-1 border-main-petrol min-w-max'>
			</div> */}
			<Outlet/>				

			<Footer/>
		</div>
	);
}
