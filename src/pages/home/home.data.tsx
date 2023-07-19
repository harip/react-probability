import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CasinoIcon from '@mui/icons-material/Casino';
import HomeIcon from '@mui/icons-material/Home';
import {
  BsFillSuitClubFill,
  BsFillSuitSpadeFill,
  BsFillSuitHeartFill,
  BsFillSuitDiamondFill
} from 'react-icons/bs';
import {
  PiBezierCurveThin
} from 'react-icons/pi';

export const probabilityOptions = [
  {
    id: 'deck',
    primary: 'Deck Probability',
    secondary: 'Interactively explore the probability of drawing cards from a deck',
    icon: (
          <>
            <div>
              <BsFillSuitSpadeFill/>
              <BsFillSuitClubFill/>
            </div>
            <BsFillSuitHeartFill />
            <BsFillSuitDiamondFill />
          </>
    ),
  },
  {
    id: 'coin',
    primary: 'Coin Probability',
    secondary: 'Interactively explore the probability of getting heads when flipping a coin',
    icon: <AccountCircleIcon fontSize="large" />,
  },
  {
    id: 'dice',
    primary: 'Dice Probability',
    secondary: 'Interactively explore the probability of rolling dice and attaining a specific value',
    icon: <CasinoIcon fontSize="large" />,
  },
];

export const conicOptions = [
  {
    id: 'parabola',
    primary: 'Parabola',
    secondary: 'A symmetrical open plane curve formed by the intersection of a cone with a plane parallel to its side',
    icon: <PiBezierCurveThin fontSize="large" />,
  },
];
