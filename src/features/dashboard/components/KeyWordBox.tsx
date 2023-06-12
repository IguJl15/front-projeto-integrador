import { Box } from '@mui/material';

export type IKeyWordProps = {
  keyWord: string;
};

export const KeyWordBox = (props: IKeyWordProps) => {
  return (
    <Box padding={1} sx={{ background: '#D0D0D0', color: 'white', borderRadius: 5 }}>
      {props.keyWord}
    </Box>
  );
};
