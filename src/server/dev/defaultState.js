const defaultState = {
  users: [
    {
      id: 'cf933aaa-bf95-430b-8e7e-9c46155c166c',
      name: 'Mag',
      hash:
        '53832cf6159de61b3954ea48f1ab104ca288863eebff5d0d33188885f6a5643ade7ce93d86ac19f68c440d33e2ab75eaeaf218e54807c3760236e39ed372f393',
      salt: '5bab82d49f50f8fb4dc9823badde62837ec58de098d5076a8c4cca53ac601a36',
    },
    {
      id: 'aca4b088-1b6a-40a2-ada5-a99f61cb2043',
      name: 'Matt',
      hash:
        'ce3ba7b511e0ab5c7d95628ba300294118a0e3a1fd9d3ba59492a9757252bf2eb115f6006038ac05490a42bc74682119e28000b8cdc3a33295e8374c4f8f4fce',
      salt: '4c11a62484650e70bd9bd0645e5b06f2909f019b8491c0963b621dafb9ed2268',
    },
  ],
  tags: [
    { id: '7d4eb136-bf8f-4713-b1d3-d7bcd880f2be', name: 'Sucette' },
    { id: '91dab940-0101-429b-b1e4-0dcd111b4bff', name: 'Arc-en-ciel' },
    { id: 'd4467547-7afb-4fc8-b001-0c75d437ed0d', name: 'Pingouin' },
    { id: '84be99ce-ad8e-4ad0-b820-6bdfd19e7601', name: 'Mammouth' },
    { id: 'cf6b03a5-4f02-4e9a-9044-fd73c5d04cc2', name: 'Espace' },
    { id: '2baf6088-9fb9-4226-839c-dc6d32f46fad', name: 'Spaghetti' },
    { id: '4881ad1e-7d23-4d5e-b5bc-ab025c283180', name: 'Papier toilette' },
    { id: 'b028f39a-e692-4f58-b240-2289dde9759b', name: 'Cataclysme' },
    { id: 'dd96dc9c-222f-457e-919e-46daf87909f2', name: 'Cookie' },
    { id: 'd57759bc-79de-4671-a62a-614fe02b1167', name: 'Chaussette' },
    { id: '2d89e74a-097d-4936-969e-dafdf5d693b2', name: 'Abeille' },
    { id: '7b5b516d-60e9-4fe0-8191-56fcf269a505', name: 'Rococo' },
  ],
  grids: [
    {
      id: '5204b57a-115d-44f0-a930-878b47b3788c',
      user: 'cf933aaa-bf95-430b-8e7e-9c46155c166c',
      name: 'La grille de Mag',
      lineThemes: [
        '7d4eb136-bf8f-4713-b1d3-d7bcd880f2be',
        '91dab940-0101-429b-b1e4-0dcd111b4bff',
        'd4467547-7afb-4fc8-b001-0c75d437ed0d',
        '84be99ce-ad8e-4ad0-b820-6bdfd19e7601',
        'cf6b03a5-4f02-4e9a-9044-fd73c5d04cc2',
        '2baf6088-9fb9-4226-839c-dc6d32f46fad',
      ],
      colThemes: [
        '4881ad1e-7d23-4d5e-b5bc-ab025c283180',
        'b028f39a-e692-4f58-b240-2289dde9759b',
        'dd96dc9c-222f-457e-919e-46daf87909f2',
        'd57759bc-79de-4671-a62a-614fe02b1167',
        '2d89e74a-097d-4936-969e-dafdf5d693b2',
        '7b5b516d-60e9-4fe0-8191-56fcf269a505',
      ],
    },
    {
      id: '611f3f85-e915-4941-823c-bb62ec77ceeb',
      user: 'aca4b088-1b6a-40a2-ada5-a99f61cb2043',
      name: 'La grille de Matt',
      lineThemes: [
        '7d4eb136-bf8f-4713-b1d3-d7bcd880f2be',
        '91dab940-0101-429b-b1e4-0dcd111b4bff',
        'd4467547-7afb-4fc8-b001-0c75d437ed0d',
        '84be99ce-ad8e-4ad0-b820-6bdfd19e7601',
        'cf6b03a5-4f02-4e9a-9044-fd73c5d04cc2',
        '2baf6088-9fb9-4226-839c-dc6d32f46fad',
      ],
      colThemes: [
        '4881ad1e-7d23-4d5e-b5bc-ab025c283180',
        'b028f39a-e692-4f58-b240-2289dde9759b',
        'dd96dc9c-222f-457e-919e-46daf87909f2',
        'd57759bc-79de-4671-a62a-614fe02b1167',
        '2d89e74a-097d-4936-969e-dafdf5d693b2',
        '7b5b516d-60e9-4fe0-8191-56fcf269a505',
      ],
    },
  ],
  hybrids: [
    {
      id: 'b4cdc801-583a-4bd9-81b7-6c2f4e5ef896',
      name: 'Spaghetti/Cataclysme',
      url: '/Images/20200409_174234.jpg',
      tags: [
        '2baf6088-9fb9-4226-839c-dc6d32f46fad',
        'b028f39a-e692-4f58-b240-2289dde9759b',
      ],
      grid: '5204b57a-115d-44f0-a930-878b47b3788c',
      user: 'cf933aaa-bf95-430b-8e7e-9c46155c166c',
    },
    {
      id: '46a3a968-5b9c-4c47-8e60-16b493e37e0f',
      name: 'Sucette/Abeille',
      url: '/Images/20200411_112906.jpg',
      tags: [
        '7d4eb136-bf8f-4713-b1d3-d7bcd880f2be',
        '2d89e74a-097d-4936-969e-dafdf5d693b2',
      ],
      grid: '5204b57a-115d-44f0-a930-878b47b3788c',
      user: 'cf933aaa-bf95-430b-8e7e-9c46155c166c',
    },
    {
      id: '4f9f0ce7-30e0-42b9-9f61-4517ba68bb5a',
      name: 'Spaghetti/Cataclysme',
      url: '/Images/20200409_174234.jpg',
      tags: [
        '2baf6088-9fb9-4226-839c-dc6d32f46fad',
        'b028f39a-e692-4f58-b240-2289dde9759b',
      ],
      grid: '611f3f85-e915-4941-823c-bb62ec77ceeb',
      user: 'aca4b088-1b6a-40a2-ada5-a99f61cb2043',
    },
    {
      id: '6b52fe7a-837b-44a4-a128-cd914fd19e75',
      name: 'Sucette/Abeille',
      url: '/Images/20200411_112906.jpg',
      tags: [
        '7d4eb136-bf8f-4713-b1d3-d7bcd880f2be',
        '2d89e74a-097d-4936-969e-dafdf5d693b2',
      ],
      grid: '611f3f85-e915-4941-823c-bb62ec77ceeb',
      user: 'aca4b088-1b6a-40a2-ada5-a99f61cb2043',
    },
  ],
};
export default defaultState;
