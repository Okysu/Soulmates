export interface Event {
  date: string;
  title: string;
  description: string;
  image?: string;
}

export const events: Event[] = [
  {
    date: '2025-04-25',
    title: '确认关系',
    description: '四月晨光停驻在11:30的刻度，当你说出「说我愿意有点太怪了，不过我同意了」时，悬在时光枝头的期待终于落地生根。那个瞬间像被定格的晨露，折射出我们故事最初的虹彩。至此，我们的故事正式开始。', 
  }
];