import { Stack } from '@mui/material';
import { INewsCardProps, NewsCard } from '../components/NewsCard';

const posts: INewsCardProps[] = [
  {
    dateTime: Date.now(),
    image: '../../../../public/assets/midnight-gospel-1-1024x576.png',
    title: 'Generico',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    keyWordList: [{ keyWord: 'keyword1' }, { keyWord: 'keyword2' }],
  },
  {
    dateTime: Date.now(),
    image: '../../../../public/assets/midnight-gospel-1-1024x576.png',
    title: 'Generico',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ',
    keyWordList: [{ keyWord: 'keyword1' }, { keyWord: 'keyword2' }],
  },
  {
    dateTime: Date.now(),
    image: '../../../../public/assets/midnight-gospel-1-1024x576.png',
    title: 'Generico',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    keyWordList: [{ keyWord: 'keyword1' }, { keyWord: 'keyword2' }],
  },
  {
    dateTime: Date.now(),
    image: '../../../../public/assets/midnight-gospel-1-1024x576.png',
    title: 'Generico',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    keyWordList: [{ keyWord: 'keyword1' }, { keyWord: 'keyword2' }],
  },
];

export const Dashboard = () => {
  return (
    <Stack boxShadow={3} padding={2} gap={2}>
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
  );
};
