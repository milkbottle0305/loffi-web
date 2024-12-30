import { getLostarkEvents } from '../ssr/getLostarkEvents';
import { Slider } from '../ui/Slider';

export const LostarkEventCarousel = async () => {
  const events = await getLostarkEvents();

  return (
    <Slider className="w-[500px]" showIndicators={true} showControls={false} autoSlide={false}>
      {events.map((event) => (
        <a key={event.Title} href={event.Link} className="relative block h-full w-full">
          <img
            className="h-full w-full rounded-lg border-2 border-solid border-gray-300 bg-cover bg-center"
            src={event.Thumbnail}
            alt={event.Title}
          />
          <p className="absolute bottom-8 left-4 max-w-[450px] truncate font-semibold text-white">
            {event.Title}
          </p>
        </a>
      ))}
    </Slider>
  );
};
