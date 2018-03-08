import roadsterFloorImg from './../assets/images/roadster-floor.png';
import roadsterImg from './../assets/images/roadster-car.png';
import truckFloorImg from './../assets/images/truck-floor.png';
import truckImg from '../assets/images/truck-car.png';

const slides = [
	{
		id: 1,
		name: 'Model S',
		desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ',
		color: '#0047fd',
		imgFloorUrl: truckFloorImg,
		imgUrl: truckImg,
		topSpeed: 65,
		mph: 5,
		mileRange: 500,
		bckgHeight: 300,
		carShadowHeight: 300,
		shadowOpacity: 0.2,
	},
	{
		id: 2,
		name: 'Model X',
		desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
		color: '#ee0101',
		imgFloorUrl: roadsterFloorImg,
		imgUrl: roadsterImg,
		topSpeed: 250,
		mph: 1.9,
		mileRange: 620,
		bckgHeight: 250,
		carShadowHeight: 0,
		shadowOpacity: 0.5,
	},
	{
		id: 3,
		name: 'Model 3',
		desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ',
		color: '#0047fd',
		imgFloorUrl: truckFloorImg,
		imgUrl: truckImg,
		topSpeed: 65,
		mph: 5,
		mileRange: 500,
		bckgHeight: 300,
		carShadowHeight: 250,
		shadowOpacity: 0.2,
	},
	{
		id: 4,
		name: 'Roadster',
		desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
		color: '#ee0101',
		imgFloorUrl: roadsterFloorImg,
		imgUrl: roadsterImg,
		topSpeed: 250,
		mph: 1.9,
		mileRange: 620,
		bckgHeight: 340,
		carShadowHeight: 150,
		shadowOpacity: 0.5
	},
	{
		id: 5,
		name: 'Semi truck',
		desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ',
		color: '#0047fd',
		imgFloorUrl: truckFloorImg,
		imgUrl: truckImg,
		topSpeed: 65,
		mph: 5,
		mileRange: 500,
		bckgHeight: 390,
		carShadowHeight: 400,
		shadowOpacity: 0.2,
	}
];

export default slides;
