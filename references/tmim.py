import imdb
import requests

# === FUNCTION TO PRINT TOP 100 MOVIES ===
def print_movie(m):  # This function is used for the Top 100 movies
    print(f"\nTitle: {m['title']}")
    print(f"IMDb's Rating: {m['rating']}")
    print(f"Description: {m['description']}")

# === FUNCTION TO PRINT INFO FOR USER-SEARCHED MOVIE/SERIES ===
def print_movie2(m):
    print(f"\nTitle: {m['Title']}")
    print(f"Released: {m['Released']}")
    print(f"IMDb's Rating: {m['Ratings'][0]['Value']}")
    print(f"Rated: {m['Rated']}")
    print(f"Genre: {m['Genre']}")
    print(f"Director: {m['Director']}")
    print(f"Writer: {m['Writer']}")
    print(f"Main Actors: {m['Actors']}")
    print(f"Type: {m['Type']}")
    print(f"Runtime: {m['Runtime']}")
    print(f"Language: {m['Language']}")
    print(f"Description: {m['Plot']}")

# === MAIN PROGRAM ===
def main():
    url = "https://imdb-top-100-movies.p.rapidapi.com/?rapidapi-key=5083e44b88msh1f9735fc8724d8dp119c14jsncb6d87d5ac51"
    headers = {
        "X-RapidAPI-Key": "5083e44b88msh1f9735fc8724d8dp119c14jsncb6d87d5ac51",
        "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers)

    answer = input("Would you like to see IMDb's top 100 movies? Please enter 'yes' or 'no': ").strip().lower()

    if answer == "yes":
        print("\nHere are IMDb's Top 100 movies:")
        for movie in response.json():
            print_movie(movie)
    else:
        imdb_info = imdb.IMDb()
        name = input("\nEnter the title of the movie or series you want information on: ")
        search = imdb_info.search_movie(name)

        for movie in range(len(search)):
            id = search[movie].movieID
            print(f"{search[movie]['title']} : {id}")

        the_id = input("\nPlease find the correct title and type in its ID (the 7-digit number next to the title): ")

        query = f"http://www.omdbapi.com/?apikey=56f156a5&i=tt{the_id}"
        page = requests.get(query)
        data = page.json()
        print(f"\nHere is the information on {name}:")
        print_movie2(data)

# === SAFETY CHECK FOR STANDALONE SCRIPT EXECUTION ===
if __name__ == "__main__":
    main()
