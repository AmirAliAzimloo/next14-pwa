'use client'

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from "@/utils/cn"
import { EmblaCarouselType, EmblaOptionsType,EmblaEventType } from 'embla-carousel'



const CarouselPlugin = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  )

  const [customIndex,setCustomIndex] = React.useState(0);
  const [customWidth,setCustomWidth] = React.useState(0);

  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [scrollProgress, setScrollProgress] = React.useState(0)
  const tweenFactor = React.useRef(0)
  const TWEEN_FACTOR_BASE = 0.84

  const setTweenFactor = React.useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
  }, [])


  const onScroll = React.useCallback((emblaApi: EmblaCarouselType) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
    setScrollProgress(progress * 100)
  }, [])


  const numberWithinRange = (number: number, min: number, max: number): number =>
    Math.min(Math.max(number, min), max)

  const tweenOpacity = React.useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine()
      const scrollProgress = emblaApi.scrollProgress()
      const slidesInView = emblaApi.slidesInView()
      const isScrollEvent = eventName === 'scroll'

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress
        const slidesInSnap = engine.slideRegistry[snapIndex]

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target()

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target)

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress)
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress)
                }
              }
            })
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
          const opacity = numberWithinRange(tweenValue, 0, 1).toString()
          console.log(slideIndex,'log_03')
          setCustomWidth(Number(opacity));
          setCustomIndex(slideIndex)
          emblaApi.slideNodes()[slideIndex].style.opacity = opacity
        })
      })
    },
    []
  )
 
  React.useEffect(() => {
    if (!api) {
      return
    }

    setTweenFactor(api)
    tweenOpacity(api)
    api
      .on('reInit', setTweenFactor)
      .on('reInit', tweenOpacity)
      .on('scroll', tweenOpacity)
      .on('slideFocus', tweenOpacity)

    onScroll(api)
    api
      .on('reInit', onScroll)
      .on('scroll', onScroll)
      .on('slideFocus', onScroll)
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api,onScroll,tweenOpacity])

  return (
    <>
    <Carousel
    setApi={setApi}
      plugins={[plugin.current]}
      className="w-full max-w-xs mx-auto"
    //   onMouseEnter={plugin.current.stop}
    //   onMouseLeave={plugin.current.reset}
      opts={{
        direction:'rtl',
        loop:true
      }}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem  key={index}>
            <div className="p-1 bg-red-400 my-2 rounded-lg cursor-grab">
            <div className="text-4xl font-semibold text-white flex items-center justify-center  my-10 min-h-[200px]  ">{index + 1}</div>
              {/* <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card> */}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious /> */}
      {/* <CarouselNext /> */}
    </Carousel>
    {/* <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
    </div> */}
    <div className="py-2 text-center text-sm text-muted-foreground  w-full max-w-xs mx-auto flex items-center justify-between px-24">
    {Array.from({ length: 5 }).map((_, index) => (
        <div 
        key={index}
        className={cn(
            "text-4xl font-semibold text-white  rounded-full w-4 h-4 text-center transition-all duration-300 ease-in-out ",
            (current - 1) == index ? 'bg-sky-400 w-8' : 'bg-white',
        )}
        >
           
        </div>
    ))}
    </div>

    {/* <div className="bg-green-500 h-[30px] w-full max-w-xs mx-auto">
          <div
            className="bg-orange-500  h-[10px]"
            style={{ transform: `translate3d(${-scrollProgress}%,0px,0px)`, width: `${scrollProgress}%` }}
          />
      </div> */}

    
    </>
  )
}

export default CarouselPlugin;