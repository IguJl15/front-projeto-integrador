import { Box } from '@mui/material';
import { black4, primaryColor } from '@/core/ui/constants/colors';

export type IKeyWordProps = {
  keyWord: string;
};

export const KeyWordBox = (props: IKeyWordProps) => {
  return (
    <Box padding={1} sx={{ background: black4, color: primaryColor, borderRadius: 5 }}>
      {props.keyWord}
    </Box>
  );
};
