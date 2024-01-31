import { Button } from '@mui/material';
import React from 'react'
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';

export default function ButtonClick({onclick}) {
    return (
        <Button variant='outlined'
         onClick={onclick} ><PhoneEnabledIcon/></Button>
      );
}
