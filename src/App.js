import Routes from './routes';
import Button from './components/button';
import ThemesApply, { ThemeContext } from './components/themes';
import { useContext, useState } from 'react';
import './assets/stylesheet/app.scss';
import UploadAvatar from './components/uploadAvatar';
import { Dropdown, DropdownButton } from './components/dropdown';
import Radio from './components/radio';
import CheckBox from './components/checkbox';
import LearnChildren from './components/children';
import { DialogContext } from './components/dialogs/Provider';
import ErrorDialog from './components/dialogs/template/ErrorDialog';
import PortalDialogs, { DialogPortalContext } from './components/dialogs/PortalDialogs';
import NotificationDialog from './components/dialogs/portalDialogs/NotificationDialog';
import VideoJS from './components/video';
import Firebase from './components/firebase';

function App() {
  const { theme, handleChangeTheme } = useContext(ThemeContext);
  const { appendDialog } = useContext(DialogContext)
  const {appendDialogPortal} = useContext(DialogPortalContext);


  // options dropdown
  const options = [
    {value: 'vn', text: 'Vietnamese'},
    {value: 'en', text: 'English'},
  ]
  const [valueDropdown, setValueDropdown] = useState('vn');

  // checkbox array
  const avantages = [
    {value: 1, text: 'Handsome'},
    {value: 2, text: 'Rich'},
    {value: 3, text: 'Poor'}
  ]

  // handle show dropdown
  const handleShowDropdown = () => {
    appendDialog(<ErrorDialog onClick={() => alert('click')} />)
  }

  const handleShowDialogPortal = () => {
    appendDialogPortal(<NotificationDialog />)
  }

  return (
    <div className='App'>
      {/* Implement ads in video */}
      <div>
        <h4>Implement Ads in video</h4>
        <VideoJS />
      </div>

      {/* <Routes /> */}

      <Firebase />

      {/* <VideoJS /> */}

      {/* <Button className='button' variant='primary' color='primary'>Cao Kha Hieu</Button>
      <Button className='button' variant='primary' color='danger'>Cao Kha Hieu</Button>
      <Button className='button' variant='primary' color='outline'>Cao Kha Hieu</Button> */}

      {/* Apply dynamic theme */}
      {/* <button onClick={() => handleChangeTheme(theme  === 'light' ? 'dark' : 'light')}>
        Change Themes
      </button>
      <div className='apply-theme'>
      </div> */}


      {/* Apply HOC */}


      {/* Upload avatar */}
      {/* <UploadAvatar />
      <br /> */}

      {/* Dropdown cpn  */}
      <Dropdown options={options} value={valueDropdown} onChange={(value) => setValueDropdown(value)}>
        <DropdownButton>
          Dropdown
        </DropdownButton>
      </Dropdown>

      {/* Radio cpn */}
      <h4>Radio group</h4>
      <Radio defaultValue={1} onChange={(value) => console.log(value)} />

      {/* checkbox cpn */}
      <br></br>
      <h4>Check box group</h4>
      {
        avantages.map(advantage => <CheckBox key={advantage.value} value={advantage.value} text={advantage.text} onChange={() => console.log('cao kha hieu')} />)
      }

      {/* LearnChildren */}
      <br></br>
      <h4>Children in react</h4>
      <LearnChildren />

      {/* Dialog */}
      <h4>Dialog Demo</h4>
      <button onClick={handleShowDropdown}>Show dialog</button>

      {/* Dialog Portal */}
      <br></br>
      <button onClick={handleShowDialogPortal}>Show dialog using Portal</button>
    </div>
  );
}

export default App;
