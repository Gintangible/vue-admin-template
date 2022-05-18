const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
};

module.exports = [
  // user login
  {
    url: '/admin-user/login',
    type: 'post',
    response: () => {
      return {
        code: 20000,
        data: {
          token: 'token_ok'
        }
      };
    }
  },

  // get user info
  {
    url: '/admin-user/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query;
      const info = users[token];

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        };
      }

      return {
        code: 20000,
        data: info
      };
    }
  },

  // user logout
  {
    url: '/admin-user/user/logout',
    type: 'post',
    response: () => {
      return {
        code: 20000,
        data: 'success'
      };
    }
  }
];
