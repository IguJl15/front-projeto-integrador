import { Stack, Typography, CardContent, CardMedia, Card } from '@mui/material';
import { IKeyWordProps, KeyWordBox } from './KeyWordBox';

export type INewsCardProps = {
  image: string;
  title: string;
  mainContent: string;
  secondaryContent: string;
  keyWordList?: IKeyWordProps[];
};

export const NewsCard = (props: INewsCardProps) => {
  return (
    <Card sx={{ padding: 2, maxHeight: 210, background: '#F5F5F5' }}>
      <Stack direction={'row'} gap={4}>
        <CardMedia component="img" height="210" sx={{ width: 300 }} image={props.image} />
        <CardContent>
          <Typography variant="h5">{props.title}</Typography>
          <Typography variant="h6">{props.mainContent}</Typography>
          <Typography variant="body1">{props.secondaryContent}</Typography>
          <Stack direction={'row'} gap={1}>
            {props.keyWordList?.map((data, index) => (
              <KeyWordBox key={index} keyWord={data.keyWord} />
            ))}
          </Stack>
        </CardContent>
      </Stack>
    </Card>
  );
};
