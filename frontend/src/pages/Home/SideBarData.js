import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as FiIcons from 'react-icons/fi';
import * as BiIcons from 'react-icons/bi';

export const SidebarData = [
  {
    title: 'Página inicial',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
    id: 'first',
  },
  {
    title: 'Adicionar nota',
    path: '/addnote',
    icon: <FiIcons.FiFilePlus />,
    cName: 'nav-text',
  },
  {
    title: 'Todas as notas',
    path: '/viewnotes',
    icon: <FiIcons.FiFileText />,
    cName: 'nav-text',
  },
  {
    title: 'Configurações',
    path: '#',
    icon: <FiIcons.FiSettings />,
    cName: 'nav-text',
  },
  {
    title: 'Lixeira',
    path: '#',
    icon: <FiIcons.FiTrash2 />,
    cName: 'nav-text',
  },
  {
    title: 'Suporte',
    path: '/support',
    icon: <BiIcons.BiSupport />,
    cName: 'nav-text',
  },
];
