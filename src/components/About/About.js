import { Container, Card, Col } from "react-bootstrap"
import "./About.scss"
import AuthorCard from "./AuthorCard"

export default function About() {
  const authors = [
    {
      nickname: "Object_417",
      avatar: "https://i.pinimg.com/originals/bb/18/8e/bb188e0bec649d84873aa871d2529436.jpg",
      occupation: "Front-End Developer",
      link: "https://github.com/Object417",
      description: [
        `Просто человек, которому нравится не столько кодинг, сколько искусство оживлять вещи.
        Мне нравится то, чем я занимаюсь, но не нравится, когда любимое дело превращается
        в ежедневные мучения. У меня хорошая обучаемость, мне не трудно осваивать что-то новое,
        но только в том случае, когда это имеет смысл. Бесполезные и бессмысленные на мой взгляд вещи
        я никогда не смогу освоить и полюбить.`,
        `Нечто похожее приключилось и с этим проектом: в начале мне было интересно,
        но очень скоро, когда я получил уже все необходимые знания, он просто наскучил.
        Я писал через силу, откладывал всё на завтра. Частично проблема была и в том,
        что это не просто мой первый проект на React, а вообще первый "большой" проект.
        С наращиванием функционала становилось труднее поддерживать мысли и файлы в порядке.
        Не раз было такое, что я открывал проект и сразу же закрывал его, не имея ни малейшего желания
        вспоминать, что я делал в прошлый раз и что ещё нужно сделать. Возможно, эту проблему можно
        было решить созданием доски задач (которую мы почему-то благополучно скипнули ещё в самом начале).`,
        `Вместо того, чтобы допиливать этот проект, я занимался другими, как мне кажется,
        более интересными: осваивал библиотеку three.js, изучал прикольные фишки CSS
        по типу масок и фильтров, работал с тройной вложенностью, до ночи залипал в играх.
        Видимо, в скором будущем мне придётся стать более ответственным и избавиться от прокрастинации.`
      ]
    },
    {
      nickname: "Jurb",
      avatar: "https://i.pinimg.com/550x/ed/cf/cc/edcfcceee274c98a860cfe2be92e047f.jpg",
      occupation: "Back-End Developer",
      link: "https://github.com/jurbx",
      description: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin cursus magna et sem tincidunt, quis bibendum dui suscipit. In interdum vitae est vel scelerisque. Donec maximus, nunc at placerat egestas, sapien ante interdum orci, vel varius odio libero eget mi. Praesent sodales quis odio sed porta. Aliquam faucibus in lectus euismod auctor. Duis tempor nisi non ligula posuere viverra. Curabitur tincidunt elit quis purus maximus pharetra. In mattis euismod fermentum. Vestibulum vel ornare mi. Curabitur at tortor tempus, egestas enim a, condimentum dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        "Fusce finibus viverra nibh malesuada rutrum. Duis vulputate pellentesque enim euismod tincidunt. Fusce vel finibus magna, ut tempor dolor. Etiam imperdiet nisi tellus, eu rutrum sem maximus sed. Maecenas blandit, erat eu consequat tempus, orci lorem viverra ex, eget pellentesque dui orci eu nunc. Vivamus fermentum porttitor augue, non consectetur sem tincidunt non. Fusce quis ultricies sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor augue ex, sit amet sodales eros volutpat eget."
      ]
    }
  ]

  return (
    <main className="text-white py-4">
      <Container className="py-4 bg-dark rounded">
        <h2 className="section-title">The Team</h2>
        {authors.map((author, idx) => <AuthorCard key={"authorCard" + idx} author={author} />)}
      </Container>
    </main>
  )
}
