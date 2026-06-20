import { render, fireEvent } from '@testing-library/react-native';
import TareaItem from './TareaItem';

describe('TareaItem', () => {
  const tarea = { id: '1', titulo: 'Estudiar', completada: false };

  it('muestra el título de la tarea', () => {
    const { getByText } = render(
      <TareaItem tarea={tarea} onToggle={() => {}} onAbrir={() => {}} onEliminar={() => {}} />
    );
    expect(getByText('Estudiar')).toBeTruthy();
  });

  it('llama a onAbrir cuando se toca el título', () => {
    const onAbrir = jest.fn();
    const { getByText } = render(
      <TareaItem tarea={tarea} onToggle={() => {}} onAbrir={onAbrir} onEliminar={() => {}} />
    );
    fireEvent.press(getByText('Estudiar'));
    expect(onAbrir).toHaveBeenCalledTimes(1);
  });
});