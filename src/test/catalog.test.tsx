import { fireEvent, render, screen, cleanup, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { movies, searchMovies } from "@/data/movies";
import { StreamixProvider, useStreamix } from "@/components/streamix/StreamixContext";

function SavedList() {
  const { myListMovies, toggleList } = useStreamix();
  return (
    <>
      <button onClick={() => toggleList(movies[0]!)}>Guardar</button>
      <p data-testid="saved-count">{myListMovies.length}</p>
    </>
  );
}

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe("Catálogo", () => {
  it("encuentra títulos aunque se omitan los acentos", () => {
    expect(searchMovies(" malecon ").map((movie) => movie.title)).toEqual(["Malecón"]);
    expect(searchMovies("CIENCIA FICCION").length).toBeGreaterThan(0);
    expect(searchMovies(" ")).toEqual([]);
  });

  it("descarta datos guardados que no sean una lista de títulos válidos", async () => {
    localStorage.setItem("streamix-mylist", JSON.stringify([null, 42, "missing", movies[0]!.id]));
    render(
      <StreamixProvider>
        <SavedList />
      </StreamixProvider>,
    );
    await waitFor(() => expect(screen.getByTestId("saved-count").textContent).toBe("1"));
    expect(JSON.parse(localStorage.getItem("streamix-mylist")!)).toEqual([movies[0]!.id]);
  });

  it("conserva los pendientes al volver a abrir el catálogo", async () => {
    const first = render(
      <StreamixProvider>
        <SavedList />
      </StreamixProvider>,
    );
    fireEvent.click(screen.getByText("Guardar"));
    await waitFor(() =>
      expect(localStorage.getItem("streamix-mylist")).toBe(JSON.stringify([movies[0]!.id])),
    );
    first.unmount();
    render(
      <StreamixProvider>
        <SavedList />
      </StreamixProvider>,
    );
    await waitFor(() => expect(screen.getByTestId("saved-count").textContent).toBe("1"));
    fireEvent.click(screen.getByText("Guardar"));
    await waitFor(() => expect(localStorage.getItem("streamix-mylist")).toBe("[]"));
  });
});
