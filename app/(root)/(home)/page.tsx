import MeetingLists from '@/components/MeetingLists';
const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US',{dateStyle: 'full'})).format(now);
  return (
    <section className='flex flex-col gap-10 text-white size-full'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
          <h2 className='glassmorphism max-w-[270px] py-2 rounded text-center italic text-base font-normal'>"Connect. Collaborate. Create."</h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>{time}</h1>
            <p className='text-lg font-medium lg:text-2xl text-sky-1'>{date}</p>
          </div>
        </div>
      </div>


      <MeetingLists/>
    </section>
  )
}

export default Home