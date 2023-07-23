export default {
  display: [
    {
      name:'ID',
      key:'id',
    },
    {
      name:'Nombre',
      key:'name',
    },
    {
      name:'Teléfono',
      key:'phone',
    },
    {
      name:'Estado',
      key:'status',
    },
    {
      name:'Correo',
      key:'email',
    },
    {
      name:'Aprobado',
      key:'approval',
    },
  ],
  widths: [50,'*',100,100,200,100],
  classes: ['btn primary','','','','',''],
  actions: [
    {
      name: 'ver',
      action: (line) => console.log(line),
    },
    {
      name: 'ver',
      action: (line) => console.log(line),
    }
  ],
};