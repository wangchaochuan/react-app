export function importAll(r: any) {
  return r.keys().reduce((m: any, n: any) => {
    const module = r(n);
    const index = n.lastIndexOf('/');
    const fileName = n.substring(index + 1, n.length).split('.')[0];

    return m.concat({ module, name: fileName, path: `/${fileName}` });
  }, []);
}

export function transformToRoutes(r: any[]) {
  return r.map((item: { module: any; name: string }, index: number) => {
    const { module, name } = item;
    const Component = module.default;
    // if (!index) {
    //   return {
    //     index: true,
    //     element: <Component />,
    //   };
    // }
    return {
      path: name,
      element: <Component />,
    };
  });
}
