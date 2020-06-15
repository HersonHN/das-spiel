
let isProd = (process.env.NODE_ENV === 'production');
let data;

if (!isProd) data = [
  [
    { color: 'blue',    symbol: 'heart' },
    { color: 'pink',    symbol: 'spade' },
    { color: 'green',   symbol: 'diamond' },
    { color: 'teal',    symbol: 'spade' },
    { color: 'pink',    symbol: 'diamond' },
    { color: 'teal',    symbol: 'spade' }
  ],
  [
    { color: 'green',   symbol: 'flower' },
    { color: 'teal',    symbol: 'star' },
    { color: 'blue',    symbol: 'music' },
    { color: 'pink',    symbol: 'music' },
    { color: 'orange',  symbol: 'music' },
    { color: 'crimson', symbol: 'flower' }
  ],
  [
    { color: 'blue',    symbol: 'heart' },
    { color: 'green',   symbol: 'star' },
    { color: 'green',   symbol: 'star' },
    { color: 'crimson', symbol: 'spade' },
    { color: 'teal',    symbol: 'diamond' },
    { color: 'orange',  symbol: 'music' }
  ],
  [
    { color: 'orange',  symbol: 'star' },
    { color: 'orange',  symbol: 'flower' },
    { color: 'green',   symbol: 'diamond' },
    { color: 'teal',    symbol: 'flower' },
    { color: 'pink',    symbol: 'diamond' },
    { color: 'teal',    symbol: 'diamond' }
  ],
  [
    { color: 'blue',    symbol: 'spade' },
    { color: 'pink',    symbol: 'heart' },
    { color: 'crimson', symbol: 'diamond' },
    { color: 'orange',  symbol: 'heart' },
    { color: 'teal',    symbol: 'diamond' },
    { color: 'orange',  symbol: 'heart' }
  ],
  [
    { color: 'teal',    symbol: 'flower' },
    { color: 'pink',    symbol: 'heart' },
    { color: 'crimson', symbol: 'star' },
    { color: 'crimson', symbol: 'spade' },
    { color: 'teal',    symbol: 'diamond' },
    { color: 'orange',  symbol: 'spade' }
  ]
];

export { data as data };
