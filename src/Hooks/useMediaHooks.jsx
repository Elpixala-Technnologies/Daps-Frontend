import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  getExploreBrandUrl,
  deletExploreBrandUrl,
  getStoryUrl,
  deletStoryUrl,
  getTrendingProductUrl,
  deletTrendingProductUrl,
  getBannersUrl,
  deletBannersUrl,
} from "../Utils/Urls/MediaUrl";

const useMediaHooks = () => {
  const {
    data: exploreBrandData,
    isLoading: exploreBrandLoaded,
    refetch: refetchexploreBrand,
  } = useQuery({
    queryKey: ["exploreBrandData"],
    queryFn: async () => {
      try {
        const res = await fetch(getExploreBrandUrl);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        return data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });

  const handelExploreBrandDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      const res = await fetch(deletExploreBrandUrl(id), {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data) {
        Swal.fire({
          position: "center",
          timerProgressBar: true,
          title: data.message,
          iconColor: "#ED1C24",
          toast: true,
          icon: "error",
          showClass: {
            popup: "animate__animated animate__fadeInRight",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutRight",
          },
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        Swal.fire({
          position: "center",
          timerProgressBar: true,
          title: "Successfully Delete !",
          iconColor: "#ED1C24",
          toast: true,
          icon: "success",
          showClass: {
            popup: "animate__animated animate__fadeInRight",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutRight",
          },
          showConfirmButton: false,
          timer: 3500,
        });
        refetchexploreBrand();
      }
    }
  };

  const {
    data: storyData,
    isLoading: storyLoaded,
    refetch: refetchStory,
  } = useQuery({
    queryKey: ["storyData"],
    queryFn: async () => {
      try {
        const res = await fetch(getStoryUrl);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        return data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });

  const handelStoryDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      const res = await fetch(deletStoryUrl(id), {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data) {
        Swal.fire({
          position: "center",
          timerProgressBar: true,
          title: data.message,
          iconColor: "#ED1C24",
          toast: true,
          icon: "error",
          showClass: {
            popup: "animate__animated animate__fadeInRight",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutRight",
          },
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        Swal.fire({
          position: "center",
          timerProgressBar: true,
          title: "Successfully Delete !",
          iconColor: "#ED1C24",
          toast: true,
          icon: "success",
          showClass: {
            popup: "animate__animated animate__fadeInRight",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutRight",
          },
          showConfirmButton: false,
          timer: 3500,
        });
        refetchStory();
      }
    }
  };

  const {
    data: trendingProductData,
    isLoading: trendingProductLoaded,
    refetch: refetchTrendingProduct,
  } = useQuery({
    queryKey: ["trendingProductData"],
    queryFn: async () => {
      try {
        const res = await fetch(getTrendingProductUrl);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        return data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });

  const handelTrendingProductDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      const res = await fetch(deletTrendingProductUrl(id), {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data) {
        Swal.fire({
          position: "center",
          timerProgressBar: true,
          title: data.message,
          iconColor: "#ED1C24",
          toast: true,
          icon: "error",
          showClass: {
            popup: "animate__animated animate__fadeInRight",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutRight",
          },
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        Swal.fire({
          position: "center",
          timerProgressBar: true,
          title: "Successfully Delete !",
          iconColor: "#ED1C24",
          toast: true,
          icon: "success",
          showClass: {
            popup: "animate__animated animate__fadeInRight",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutRight",
          },
          showConfirmButton: false,
          timer: 3500,
        });
        refetchTrendingProduct();
      }
    }
  };

  const {
    data: bannersData,
    isLoading: bannersLoaded,
    refetch: refetchBanners,
  } = useQuery({
    queryKey: ["bannersData"],
    queryFn: async () => {
      try {
        const res = await fetch(getBannersUrl);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        return data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });

  const handelBannersDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      const res = await fetch(deletBannersUrl(id), {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data) {
        Swal.fire({
          position: "center",
          timerProgressBar: true,
          title: data.message,
          iconColor: "#ED1C24",
          toast: true,
          icon: "error",
          showClass: {
            popup: "animate__animated animate__fadeInRight",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutRight",
          },
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        Swal.fire({
          position: "center",
          timerProgressBar: true,
          title: "Successfully Delete !",
          iconColor: "#ED1C24",
          toast: true,
          icon: "success",
          showClass: {
            popup: "animate__animated animate__fadeInRight",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutRight",
          },
          showConfirmButton: false,
          timer: 3500,
        });
        refetchBanners();
      }
    }
  };

  return {
    handelExploreBrandDelete,
    refetchexploreBrand,
    exploreBrandData,

    handelTrendingProductDelete,
    refetchTrendingProduct,
    trendingProductData,

    handelStoryDelete,
    refetchStory,
    storyData,

    handelBannersDelete,
    bannersData,
    refetchBanners,
  };
};

export default useMediaHooks;
