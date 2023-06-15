import { Stack } from '@mui/material';
import { INewsCardProps, NewsCard } from '../components/NewsCard';

const posts: INewsCardProps[] = [
  {
    image: '../../../../public/assets/midnight-gospel-1-1024x576.png',
    title: 'Generico',
    mainContent:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    secondaryContent:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat.Sed ut dui ut lacus dictum fermentum vel tincidunt neque. Sed sed lacinia lectus. Duis sit amet sodales felis.',
    keyWordList: [{ keyWord: 'keyword1' }, { keyWord: 'keyword2' }],
  },
  {
    image: '../../../../public/assets/midnight-gospel-1-1024x576.png',
    title: 'Generico',
    mainContent:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    secondaryContent:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat.Sed ut dui ut lacus dictum fermentum vel tincidunt neque. Sed sed lacinia lectus. Duis sit amet sodales felis.',
    keyWordList: [{ keyWord: 'keyword1' }, { keyWord: 'keyword2' }],
  },
  {
    image: '../../../../public/assets/midnight-gospel-1-1024x576.png',
    title: 'Generico',
    mainContent:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    secondaryContent:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat.Sed ut dui ut lacus dictum fermentum vel tincidunt neque. Sed sed lacinia lectus. Duis sit amet sodales felis.',
    keyWordList: [{ keyWord: 'keyword1' }, { keyWord: 'keyword2' }],
  },
  {
    image: '../../../../public/assets/midnight-gospel-1-1024x576.png',
    title: 'Generico',
    mainContent:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    secondaryContent:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat.Sed ut dui ut lacus dictum fermentum vel tincidunt neque. Sed sed lacinia lectus. Duis sit amet sodales felis.',
    keyWordList: [{ keyWord: 'keyword1' }, { keyWord: 'keyword2' }],
  },
];

export const Dashboard = () => {
  return (
    <Stack boxShadow={3} padding={2} gap={2}>
      {posts.map((data, index) => (
        <NewsCard
          key={index}
          image={data.image}
          title={data.title}
          mainContent={data.mainContent}
          secondaryContent={data.secondaryContent}
          keyWordList={data.keyWordList}
        />
      ))}
    </Stack>
  );
};
