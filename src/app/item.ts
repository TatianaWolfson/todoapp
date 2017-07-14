export class Item {
  title: string = '';
  isComplete: boolean = false;
}

export class List {
  items: Item[] = [
    {title: 'Buy Tesla', isComplete: false},
    {title: 'Visit Mars', isComplete: false}
  ];
}
