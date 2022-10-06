import { useNavigate } from 'react-router-dom';

export const useCustomNavigate = (planet) => {
  const navigate = useNavigate();
  const goTo = () => navigate(`/planets/${planet.name}`);

  return goTo;
};
