import { Stack, Typography, CardContent, CardMedia, Card } from '@mui/material';
import { IKeyWordProps } from './KeyWordBox';
import Term from '@/features/directions/components/Terms/Term';

export type INewsCardProps = {
  dateTime: Date;
  image: string;
  title: string;
  content: string;
  keyWordList?: IKeyWordProps[];
};

export const NewsCard = (props: INewsCardProps) => {
  return (
    <Card sx={{ background: 'white' }}>
      <Stack direction={'row'} gap={1} padding={2}>
        <CardMedia
          component="img"
          height="210"
          sx={{ width: 300, borderRadius: 2 }}
          image={props.image}
        />
        <CardContent sx={{ padding: 1, maxHeight: 100 }}>
          <Typography color={'#9D1910'} fontStyle={'inherit'}>
            {props.dateTime.toString()}
          </Typography>
          <Typography variant="h5">{props.title}</Typography>
          <Typography variant="body1">{props.content}</Typography>
          <Stack direction={'row'} gap={1}>
            {props.keyWordList?.map((data, index) => (
              <Term key={index} description={data.keyWord} />
            ))}
          </Stack>
        </CardContent>
      </Stack>
    </Card>
  );
};
