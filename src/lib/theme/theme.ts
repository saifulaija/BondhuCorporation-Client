import { createTheme } from '@mui/material/styles';


export const theme = createTheme({
  palette: {
    primary: {
      main: "#da5a47",
    },
    secondary: {
      main: "#666f73",
    },
  },
components:{
    MuiButton:{
        defaultProps:{
            variant:"contained"
        },
        styleOverrides:{
            root:{
                padding:"8px 24px"
            }
        }
    },
    MuiContainer:{
        defaultProps:{
            maxWidth:'lg'
        }
    }
},
typography:{
    body1:{
        color:"#0B1134CC"
    }
}
});

theme.shadows[1]="0px 5px 22px lightgray"
