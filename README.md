# [Chess By Nico](https://chess-by-nico.vercel.app/)

## [Live](https://chess-by-nico.vercel.app/)

## Issues Faced
- `DragClone` position state change causing unnessesary re-renders of child components
- Unnessesary re-rendering of all 64 squares upon game state changes
- Check mating logic

### Exsessive Re-rendering Due to `DragClone` Position

Experienced frequent unnecessary re-renders in the `ActiveChessBoard` component of a chess application, negatively affecting performance despite React's memoization.

#### Debugging Steps and Resolution

1. **Props Stability Check**: Verified stability of all props between renders, utilized `useMemo` and `useCallback` for complex types.
2. **Previous Props Comparison**: Implemented a custom hook to compare prop changes between renders, identifying `playMoveifValid` as the volatile prop.
   ```javascript
   const usePreviousProps = (props) => {
       const ref = useRef();
       useEffect(() => {
           ref.current = props;
       });
       return ref.current; // Returns the previous props
   };
3. **Investigate Function Dependencies**: Analyzed `playMoveifValid` dependencies, focusing on `chessBoard` and `addMoveToGame`.
4. **Isolation for Debugging**: Isolation for Debugging: Temporarily removed dependencies from `useCallback` for `playMoveifValid` to identify the source of changes.

#### Best Practices Used for Optimization

- **Ensuring Dependency Stability**: Used stable dependencies in `useCallback` and `useMemo` to avoid unnecessary re-renders.
- **React.memo for Components**: Applied `React.memo` correctly to components to prevent re-renders when props remain unchanged.
- **Profiler for Performance**: Utilized React DevTools and performance profiling to identify and resolve unnecessary re-renders.
- **Document Logic and Decisions**: Maintain clear documentation and comments for complex hooks and component logic.
