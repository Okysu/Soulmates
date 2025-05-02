// 恋爱主题配置类型
export interface ThemeConfig {
  love: {
    startDate: string; // 恋爱开始日期
    avatars: {
      boy: {
        name: string;
        url: string;
      };
      girl: {
        name: string;
        url: string;
      };
    };
    swap?: boolean; // 是否交换头像顺序
  };
}

// 默认主题配置
export const defaultThemeConfig: ThemeConfig = {
  love: {
    startDate: "2025-04-25T11:30:00", // 示例日期
    avatars: {
      boy: {
        name: "小于",
        url: "https://q2.qlogo.cn/headimg_dl?dst_uin=1042346699&spec=100",
      },
      girl: {
        name: "小李",
        url: "https://q2.qlogo.cn/headimg_dl?dst_uin=2478843800&spec=100",
      },
    },
    swap: true,
  },
};

// 获取主题配置
export const getThemeConfig = (): ThemeConfig => {
  return defaultThemeConfig;
}; 