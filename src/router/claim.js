import Layout from '@/layout';

const claimRoutes = {
  path: '/claim',
  component: Layout,
  alwaysShow: true,
  redirect: '/claim/list',
  meta: {
    title: '一级菜单',
    icon: 'tree',
    roles: ['admin', 'initial_auditor', 'insurance-user', 'claim_center'],
  },
  children: [{
    path: '/list',
    name: 'Claim',
    component: () => import('@/views/claim/list'),
    meta: {
      roles: ['admin', 'initial_auditor', 'insurance-user', 'claim_center'],
      title: '二级菜单',
      icon: 'table',
    },
  },
  ]
};

export default claimRoutes;
