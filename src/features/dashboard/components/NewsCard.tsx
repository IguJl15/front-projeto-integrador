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
    <Card>
      <Stack direction={'row'} gap={1} padding={2}>
        <CardMedia component="img" height="210" sx={{ width: 300, borderRadius:2 }} image={props.image} />
        <CardContent sx={{ padding: 1, maxHeight:100 }}>
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
