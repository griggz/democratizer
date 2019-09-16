"""
I developed this script to build more accurate references within each Reactjs Build
files. Currently, all name changes and updates made to my react files within my Build directory
are not updated within the files itself. This script updates the file content
to reflect the django name.
 """
import json
from pathlib import Path
import re
import sys

sys.path.append("..")
try:
    from harvstr.settings.local import *
except:
    from harvstr.settings.production import *


class Cleaner:
    def __init__(self):
        self.dirs = []
        self.react_paths = []
        self.manifest = self.build_manifest()
        self.files_cleaned = 0

    @staticmethod
    def build_manifest():
        """captures the json built to illustrate the baseline names of all
        reactjs files, including patter, and substitute name"""
        if BUILD_JSON:
            with open(Path(BUILD_JSON), 'r') as f:
                return json.load(f)

    @staticmethod
    def clean(file, pattern, subst):
        """
        Process all build files, replacing hashed names with accurate django
        relevant names.
        :param file: react build file
        :param pattern: the regex used to id the hashed name within the file.
        :param subst: the name to replace the original hashed name.
        :return: returns updated file with accurate file and image references.
        """
        with open(Path(file)) as f:
            if not any(re.search(pattern, line) for line in f):
                print('no matches in ' + str(Path(file).name))

        with open(Path(file)) as f:
            out_fname = Path(file).name
            out = open(out_fname, "w")
            for line in f:
                out.write(re.sub(pattern, subst, line))
            out.close()
            os.rename(out_fname, Path(file))

    @staticmethod
    def check_name(pattern, file):
        """
        Checks if the pattern exists within the file in question.
        :param pattern: regex used to id the hashed name within the file.
        :param file: react build file
        :return: True/False
        """
        with open(Path(file)) as f:
            if any(re.search(pattern, line) for line in f):
                return True

    def get_dirs(self):
        """
        Gathers all relevant directories.
        :return: list of relevant paths
        """
        dirs = ['/frontend/build']
        for dirName, subdirList, fileList in os.walk(BASE_DIR):
            for name in dirs:
                if dirName.endswith(name):
                    self.dirs.append(Path(dirName).resolve())

    def get_files(self):
        """
        Gathers all relevant file paths.
        :return: list of relevant file paths
        """
        for path in self.dirs:
            if Path(path).is_dir() is True:
                file_paths = [Path(f) for f in Path(path).glob('**/*') if
                              '/frontend/build/static/' in str(
                                  Path(f)) and '.DS_Store' not in str(
                                  Path(f)) and f.is_file()]
                for js_path in file_paths:
                    self.react_paths.append(str(Path(js_path).resolve()))
            else:
                raise ValueError

    def process_files(self):
        """
        Uses buildNames to id the files in need of being checked. It then
        checks if any of the file patters exist within the file in question. It
        repeats this process for each file, updating files where it finds a match.
        :return: Updating files
        """
        buildNames = [x for x in self.manifest['files']]
        for file in self.react_paths:
            for name in buildNames:
                check = self.check_name(
                    self.manifest['files'][name]['pattern'], file)
                if check is True:
                    self.clean(file, self.manifest['files'][name]['pattern'],
                               self.manifest['files'][name]['subst'])
                    print(Path(file).name + ' updated!')
                    self.files_cleaned += 1
                else:
                    pass

    def run(self):
        self.get_dirs()
        self.get_files()
        self.process_files()

        print(str(
            self.files_cleaned) + ' react build files have been successfully updated')


def main():
    Cleaner().run()


if __name__ == '__main__':
    main()
