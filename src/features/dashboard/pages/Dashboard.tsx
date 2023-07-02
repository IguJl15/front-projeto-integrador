import { Stack } from '@mui/material';
import { INewsCardProps, NewsCard } from '../components/NewsCard';
import { MainBodyLayout } from '@/core/ui/layouts/MainBodyLayout';

const posts: INewsCardProps[] = [
  {
    dateTime: new Date(),
    image: '../../../../public/assets/midnight-gospel-1-1024x576.png',
    title: 'Generico',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    keyWordList: [{ keyWord: 'keyword1' }, { keyWord: 'keyword2' }],
  },
  {
    dateTime: new Date(),
    image: '../../../../public/assets/midnight-gospel-1-1024x576.png',
    title: 'Generico',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ',
    keyWordList: [{ keyWord: 'keyword1' }, { keyWord: 'keyword2' }],
  },
  {
    dateTime: new Date(),
    image: '../../../../public/assets/midnight-gospel-1-1024x576.png',
    title: 'Generico',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    keyWordList: [{ keyWord: 'keyword1' }, { keyWord: 'keyword2' }],
  },
  {
    dateTime: new Date(),
    image: '../../../../public/assets/midnight-gospel-1-1024x576.png',
    title: 'Generico',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    keyWordList: [{ keyWord: 'keyword1' }, { keyWord: 'keyword2' }],
  },
];

export const Dashboard = () => {
  return (
    <MainBodyLayout title='Últimas notícias'>
      <Stack gap={2} sx={{alignSelf: 'stretch'}}>
        {posts.map((data, index) => (
          <NewsCard
            key={index}
            dateTime={data.dateTime}
            image={data.image}
            title={data.title}
            content={data.content}
            keyWordList={data.keyWordList}
          />
        ))}
      </Stack>
    </MainBodyLayout>
  );
};
