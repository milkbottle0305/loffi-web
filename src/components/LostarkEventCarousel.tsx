import { getLostarkEvents } from '@/ssr/getLostarkEvents';
import { Slider } from '@/ui/Slider';

export const LostarkEventCarousel = async () => {
  const events = await getLostarkEvents();

  return (
    <Slider className="h-48 w-96" showIndicators={true} showControls={false} autoSlide={true}>
      {events.map((event) => (
        <a key={event.Title} href={event.Link} className="relative h-full w-full">
          <img
            className="h-48 w-96 rounded-lg border-2 border-solid border-gray-300 bg-cover bg-center"
            src={event.Thumbnail}
            alt={event.Title}
          />
          <p className="absolute bottom-5 right-4 max-w-[450px] truncate rounded bg-black bg-opacity-75 px-2 py-1 font-semibold text-white">
            {event.Title}
          </p>
        </a>
      ))}
    </Slider>
  );
};
